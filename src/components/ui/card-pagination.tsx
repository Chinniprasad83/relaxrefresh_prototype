import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type CardPaginationProps<T> = {
  items: T[];
  initialVisible?: number;
  debug?: boolean;
  fieldMap?: {
    image?: string;
    header?: string;
    details?: string[];
  };
  renderImage?: (item: T) => React.ReactNode;
  renderHeader?: (item: T) => React.ReactNode;
  renderDetails?: (item: T) => React.ReactNode;
  onCardClick?: (item: T) => void;
  resultsLabel?: string;
};

function getImageFromItem(item: any): string | undefined {
  return (
    item?.image || item?.img || item?.photo || item?.avatar || item?.thumbnail || undefined
  );
}

function getHeaderFromItem(item: any): React.ReactNode {
  return item?.title ?? item?.name ?? item?.header ?? item?.heading ?? undefined;
}

function headerContainsImage(node: any): boolean {
  if (node == null || typeof node === 'boolean') return false;
  if (Array.isArray(node)) return node.some(headerContainsImage);
  if (React.isValidElement(node)) {
    const t = (node.type as any);
    if (typeof t === 'string' && t.toLowerCase() === 'img') return true;
    return headerContainsImage((node as any).props?.children);
  }
  return false;
}

function normalizeDetails(item: any): Array<{ label?: string; value: React.ReactNode }> {
  const details = item?.details;

  if (Array.isArray(details)) {
    return details.map((d: any) => {
      if (d == null) return { value: '' };
      if (typeof d === 'object') return { label: d.label ?? undefined, value: d.value ?? d };
      return { value: String(d) };
    });
  }

  if (details && typeof details === 'object') {
    return Object.entries(details).map(([k, v]) => ({ label: k, value: v })) as any;
  }

  const reserved = new Set(['id', 'image', 'img', 'photo', 'avatar', 'thumbnail', 'title', 'name', 'header', 'details']);
  return Object.keys(item)
    .filter((k) => !reserved.has(k))
    .map((k) => ({ label: k, value: (item as any)[k] }));
}

function formatLabel(key: string) {
  const s = key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim();
  return s.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

export function CardPagination<T>({
  items,
  initialVisible = 4,
  renderImage,
  renderHeader,
  renderDetails,
  fieldMap,
  onCardClick,
  resultsLabel,
}: CardPaginationProps<T>) {
  const [visible, setVisible] = useState<number>(Math.min(initialVisible, items.length));

  function loadMore() {
    setVisible((v) => Math.min(items.length, v + initialVisible));
  }

  return (
    <section className="space-y-4">
      {/* <div className="text-center text-sm text-muted-foreground">
        {items.length} {typeof resultsLabel !== 'undefined' ? resultsLabel : 'Results found'}
      </div> */}
      
      <div className="space-y-4">
        {items.slice(0, visible).map((item, idx) => {
          const key = (item as any).id ?? idx;
          const headerNode = renderHeader
            ? renderHeader(item)
            : (fieldMap?.header ? ((item as any)[fieldMap.header] ?? getHeaderFromItem(item as any)) : getHeaderFromItem(item as any));

          const imageNode = renderImage
            ? renderImage(item)
            : (() => {
              const urlFromField = fieldMap?.image ? (item as any)[fieldMap.image] : undefined;
              const url = urlFromField ?? getImageFromItem(item as any);
              if (url) return <img src={url} alt={String(headerNode ?? 'image')} className="w-20 h-20 object-cover rounded-lg" />;
              return null;
            })();

          const shouldShowLeftImage = !!imageNode && !headerContainsImage(headerNode);

          const detailsNode = renderDetails
            ? renderDetails(item)
            : (fieldMap?.details ? (
              <div className="space-y-1">
                {fieldMap.details.map((k, i) => (
                  <div className="flex gap-2 text-sm" key={i}>
                    <span className="text-muted-foreground min-w-[60px]">{formatLabel(k)}:</span>
                    <span className="font-medium">{String((item as any)[k] ?? '—')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {normalizeDetails(item as any).map((d, i) => (
                  <div className="flex gap-2 text-sm" key={i}>
                    {d.label ? <span className="text-muted-foreground min-w-[60px]">{d.label}:</span> : null}
                    <span className="font-medium">{d.value as any}</span>
                  </div>
                ))}
              </div>
            ));

          return (
            <Card
              key={key}
              className={`p-4 transition-all duration-200 ${
                onCardClick ? 'cursor-pointer hover:shadow-md' : ''
              }`}
              tabIndex={onCardClick ? 0 : undefined}
              onClick={onCardClick ? () => onCardClick(item) : undefined}
              onKeyDown={
                onCardClick
                  ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCardClick(item);
                    }
                  }
                  : undefined
              }
            >
              <div className="flex gap-4">
                {shouldShowLeftImage && (
                  <div className="flex-shrink-0">
                    {imageNode}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {headerNode && (
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {headerNode}
                    </h3>
                  )}
                  {detailsNode}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {visible < items.length && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMore} variant="outline">
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}