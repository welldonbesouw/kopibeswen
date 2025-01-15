export default function formatPrice(price, locale = "id-ID") {
   return price.toLocaleString(locale);
}
