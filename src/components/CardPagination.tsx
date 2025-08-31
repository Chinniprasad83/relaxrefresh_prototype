import React, { useState } from 'react';
import styles from './CardPagination.module.css';

export type CardPaginationProps<T> = {
  items: T[];
  initialVisible?: number;
  debug?: boolean;
  // Optional mapping from item keys to UI regions. If provided and render*
  // props are not supplied the component will use these keys to extract
  // values from each item.
  fieldMap?: {
    image?: string;
    header?: string;
    details?: string[];
  };
  // Optional overrides. If not provided the component will try to
  // derive values from common property names on the item object.
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
    // details might be an array of primitives or objects
    return details.map((d: any) => {
      if (d == null) return { value: '' };
      if (typeof d === 'object') return { label: d.label ?? undefined, value: d.value ?? d };
      return { value: String(d) };
    });
  }

  if (details && typeof details === 'object') {
    return Object.entries(details).map(([k, v]) => ({ label: k, value: v })) as any;
  }

  // Fallback: iterate item keys except a few reserved ones
  const reserved = new Set(['id', 'image', 'img', 'photo', 'avatar', 'thumbnail', 'title', 'name', 'header', 'details']);
  return Object.keys(item)
    .filter((k) => !reserved.has(k))
    .map((k) => ({ label: k, value: (item as any)[k] }));
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
    <section className={[styles.resultsList].filter(Boolean).join(' ')}>
      <div className={styles.resultsFound}>
        {items.length} {typeof resultsLabel !== 'undefined' ? resultsLabel : 'Results found'}
      </div>
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
            if (url) return <img src={url} alt={String(headerNode ?? 'image')} className={styles.image} />;
            return null;
          })();

        // If the header already renders an <img>, don't show the left image again.
        const shouldShowLeftImage = !!imageNode && !headerContainsImage(headerNode);

        const detailsNode = renderDetails
          ? renderDetails(item)
          : (fieldMap?.details ? (
            <div className={styles.detailsList}>
              {fieldMap.details.map((k, i) => (
                <div className={styles.detailRow} key={i}>
                  <div className={styles.detailLabel}>{formatLabel(k)}</div>
                  <div className={styles.detailValue}>{String((item as any)[k] ?? '\u2014')}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.detailsList}>
              {normalizeDetails(item as any).map((d, i) => (
                <div className={styles.detailRow} key={i}>
                  {d.label ? <div className={styles.detailLabel}>{d.label}</div> : null}
                  <div className={styles.detailValue}>{d.value as any}</div>
                </div>
              ))}
            </div>
          ));


        function formatLabel(key: string) {
          // convert camelCase, snake_case, kebab-case to Title Case
          const s = key
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/[_-]+/g, ' ')
            .trim();
          return s.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
        }
        return (
          <article
            key={key}
            className={styles.card}
            tabIndex={0}
            style={{ cursor: onCardClick ? 'pointer' : undefined }}
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
            <div className={styles.container}>
              <div className={styles.leftCol}>{shouldShowLeftImage ? imageNode : null}</div>
              <div className={styles.details}>
                {headerNode ? <div className={styles.cardTitle}>{headerNode}</div> : null}
                {detailsNode}
              </div>
            </div>
          </article>
        );
      })}
      {visible < items.length && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreBtn} onClick={loadMore} aria-label="Load more results">
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
