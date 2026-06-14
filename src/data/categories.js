export const categoryGroups = [
  {
    title: "Men's Footwear",
    slug: "mens-footwear",
    subcategories: [
      { title: "Men's Shoes", slug: "mens-shoes" },
      { title: "Men's Slippers", slug: "mens-slippers" },
      { title: "Men's Sandals", slug: "mens-sandals" },
      { title: "Sports Shoes", slug: "sports-shoes" },
    ],
  },
  {
    title: "Women's Footwear",
    slug: "womens-footwear",
    subcategories: [
      { title: "Women's Shoes", slug: "womens-shoes" },
      { title: "Women's Slippers", slug: "womens-slippers" },
      { title: "Women's Sandals", slug: "womens-sandals" },
      { title: "Heels", slug: "heels" },
    ],
  },
  {
    title: "Kids Footwear",
    slug: "kids-footwear",
    subcategories: [
      { title: "Boys Shoes", slug: "boys-shoes" },
      { title: "Girls Shoes", slug: "girls-shoes" },
      { title: "School Shoes", slug: "school-shoes" },
    ],
  },
];

export const allSubcategories = categoryGroups.flatMap((group) =>
  group.subcategories.map((subcategory) => ({
    ...subcategory,
    category: group.title,
    categorySlug: group.slug,
  }))
);

export function getCategoryLabel(slug) {
  if (!slug || slug === "all") {
    return "All Categories";
  }

  return categoryGroups.find((category) => category.slug === slug)?.title ?? slug;
}

export function getSubcategoryLabel(slug) {
  if (!slug || slug === "all") {
    return "All Types";
  }

  return allSubcategories.find((subcategory) => subcategory.slug === slug)?.title ?? slug;
}
