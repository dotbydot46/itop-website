import { MapPin, Phone } from '@phosphor-icons/react';

export function StoreDetails() {
  return <div className="visit-details">
    <div><MapPin size={25} weight="light" aria-hidden="true" /><p><strong>160 Rushey Green</strong><br />London SE6 4HQ</p></div>
    <div><Phone size={25} weight="light" aria-hidden="true" /><p><a href="tel:+447760616466">07760 616 466</a><br /><a href="mailto:info.itop@gmail.com">info.itop@gmail.com</a></p></div>
    <table className="hours-table"><caption>Shop opening hours</caption><tbody><tr><th scope="row">Monday–Saturday</th><td>08:00–21:30</td></tr><tr><th scope="row">Sunday</th><td>10:00–21:30</td></tr></tbody></table>
    <p className="hours">Call to confirm bank holiday or temporary changes.</p>
    <div className="visit-actions"><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=iTop%2C%20160%20Rushey%20Green%2C%20London%20SE6%204HQ" target="_blank" rel="noopener noreferrer">Get directions</a><a className="text-button" href="https://share.google/a0LGBbCRpooeHfBlN" target="_blank" rel="noopener noreferrer">Google profile</a></div>
  </div>;
}
