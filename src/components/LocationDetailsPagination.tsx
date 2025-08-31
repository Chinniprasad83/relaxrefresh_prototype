import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPagination } from './CardPagination'

type Result = {
  id: string
  title: string
  image?: string
  road?: string
  city?: string
  lat?: number
  lng?: number
  space?: string
  distance?: string
}

type PaginationProps = {
  items?: Result[]
  initialVisible?: number
}

export default function LocationDetialsPagination({ items, initialVisible = 4 }: PaginationProps) {
  const navigate = useNavigate()
  const DEFAULT_ITEMS: Result[] = [
    {
      id: 'hp-thindivanam',
      title: 'HP, Thindivanam',
      image: '/details.png',
      road: 'GST road, NH45',
      city: 'Villupuram',
      lat: 12.2499,
      lng: 79.6653,
      space: '3000 sqft',
      distance: '23 km',
    },
    {
      id: 'indian-oil',
      title: 'Indian oil',
      image: '/details.png',
      road: 'GST Road, NH45',
      city: 'Villupuram',
      lat: 11.94,
      lng: 79.49,
      distance: '23 km',
    },
    {
      id: 'sample-3',
      title: 'Sample Station 3',
      image: '/details.png',
      road: 'Avenue Road',
      city: 'Madurai',
      lat: 9.9252,
      lng: 78.1198,
      space: '1500 sqft',
      distance: '12 km',
    },
    {
      id: 'sample-4',
      title: 'Sample Station 4',
      image: '/details.png',
      road: 'Ring Road',
      city: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
      distance: '45 km',
    },
  ]

  const data = items ?? DEFAULT_ITEMS

  return (
    <CardPagination
      items={data}
      initialVisible={initialVisible}
      onCardClick={(item) => navigate('/details', { state: { item } })}
      fieldMap={{
        image: 'image',
        header: 'title',
        details: ['distance', 'road', 'space', 'city'],
      }}
    />
  )
}
