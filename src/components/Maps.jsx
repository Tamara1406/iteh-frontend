import React from 'react'
import '../css/Maps.css';

const Maps = () => {
  return (
    <div className='panel'>
        <div className='prvi'>
            
            <div className='text'>
                <h2>Kontakt</h2>
            <p>Možete nas naći u Beogradu, na adresi Jove Ilica.</p>
            <p>Telefon: +11 222 333</p>
            <p>Poštanski broj: 11000</p>
            </div>
            
        </div>
        <div className='drugi'>
        <h2>Pogledajte našu lokaciju na mapi:</h2>
            <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.3982585658205!2d20.472648375974362!3d44.77268547931167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70576248bf79%3A0xadaf5cff042d3bd0!2z0KTQsNC60YPQu9GC0LXRgiDQvtGA0LPQsNC90LjQt9Cw0YbQuNC-0L3QuNGFINC90LDRg9C60LAg0KPQvdC40LLQtdGA0LfQuNGC0LXRgtCwINGDINCR0LXQvtCz0YDQsNC00YM!5e0!3m2!1ssr!2srs!4v1692477447146!5m2!1ssr!2srs"        width="600"
        height="450"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
        </div>
      
    </div>
  )
}

export default Maps

