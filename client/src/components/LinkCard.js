import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ссилка</h2>

      <p>Ваша ссилка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Звідки: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Кількість кліків по ссилці: <strong>{link.clicks}</strong></p>
      <p>Дата створення: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}
