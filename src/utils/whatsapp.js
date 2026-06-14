export const STORE_PHONE = "918445175914";
export const STORE_PHONE_DISPLAY = "+91 844 517 5914";
export const STORE_ADDRESS =
  "Raj Footwear, Jawahar Ganj, Gangoh";

export function formatPrice(price) {
  return typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : "Contact for Price";
}

export function getWhatsAppLink(product) {
  let productText = "Hi Raj Footwear, I want to know more about your footwear collection.";
  
  if (product) {
    productText = `Hi Raj Footwear, I want to know more about ${product.name}.`;
    if (product.image_urls && product.image_urls.length > 0) {
      productText += `\n\nProduct Image: ${product.image_urls[0]}`;
    }
  }

  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(productText)}`;
}
