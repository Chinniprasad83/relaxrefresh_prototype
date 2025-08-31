import React from 'react'
import { CardPagination } from './CardPagination'

const sampleData = [
  {
    id: '1',
    image: '/kfc.png', // Replace with actual image path if available
    title: 'KFC',
    distance: '23 km',
    location: 'Thiruvamattur',
    road: 'GST Road , NH45',
    city: 'GST Road , NH45',
  },
  {
    id: '2',
    image: '/temple.png', // Replace with actual image path if available
    title: 'Sri Abirameshwarar Temple',
    distance: '30 km',
    location: 'GST Road , NH45',
    road: 'GST Road , NH45',
    city: 'GST Road , NH45',
  },
  {
    id: '3',
    image: '/starbucks.png', // Replace with actual image path if available
    title: 'Starbucks Coffee Company',
    distance: '30 km',
    location: 'GST Road , NH45',
    road: 'GST Road , NH45',
    city: 'GST Road , NH45',
  },
]

export function IndividualDetailsCardPagination() {
  return (
    <div>
      <CardPagination
        items={sampleData}
        initialVisible={2}
        fieldMap={{
          image: 'image',
          header: 'title',
          details: ['distance', 'location', 'road', 'city'],
        }}
      />
    </div>
  )
}
