import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "Giuseppe",
      email: "info@thesuccesscreed.co.uk",
      password: hashSync("123456", 10),
      role: "admin"
    },
    {
      name: "Mark",
      email: "mark@example.com",
      password: hashSync("654321", 10),
      role: "user"
    }
  ],

  products: [
    {
      name: 'Wood Block Coffee Table',
      slug: 'wood-block-coffee-table',
      category: "Furniture",
      description: 'Handcrafted oak wood coffee table.',
      images: [
        '/images/sample-products/p1-1.jpg',
        '/images/sample-products/p1-2.jpg',
      ],
      price: 89.99,
      brand: 'Mike Jordan',
      rating: 4.5,
      numReviews: 10,
      stock: 3,
      isFeatured: true,
      banner: 'banner-1.jpg',
    },
    {
      name: 'Chinese table and chairs set',
      slug: 'chinese-table-and-chairs-set',
      category: "Furniture",
      description: 'A timeless Chinese table and chairs set for avid collectors.',
      images: [
        '/images/sample-products/p2-1.jpg',
        '/images/sample-products/p2-2.jpg',
      ],
      price: 201.35,
      brand: 'Brooks Brothers',
      rating: 4.2,
      numReviews: 8,
      stock: 8,
      isFeatured: true,
      banner: 'banner-2.jpg',
    },
    {
      name: 'Wicker Rattan Side Table Furniture',
      slug: 'wicker-rattan-side-table-furniture',
      category: "Furniture",
      description: 'A perfect blend of sophistication and art.',
      images: [
        '/images/sample-products/p3-1.jpg',
        '/images/sample-products/p3-2.jpg',
      ],
      price: 99.95,
      brand: 'Mary Jones Hilfiger',
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'The Pandora',
      slug: 'the-pandora',
      category: "Accessories",
      description: 'Vase vtoneware ceramic with firebrick textures',
      images: [
        '/images/sample-products/p4-1.jpg',
        '/images/sample-products/p4-2.jpg',
      ],
      price: 69.95,
      brand: 'Antoine Audet',
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Pinapple express vase',
      slug: 'pinapple-express-vase',
      category: "Accessories",
      description: 'A pinapple shaped vase ideal for your home kitchen table.',
      images: [
        '/images/sample-products/p5-1.jpg',
        '/images/sample-products/p5-2.jpg',
      ],
      price: 39.99,
      brand: 'Jamie Cham',
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Enlightenment Gem',
      slug: 'enlightenment-gem',
      category: "Jewellery",
      description: 'A must have handcrafted bracelet brought to you directly from a Tibet.',
      images: [
        '/images/sample-products/p6-1.jpg',
        '/images/sample-products/p6-2.jpg',
      ],
      price: 109.99,
      brand: 'Nawang Norbu',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
  ],
};

export default sampleData;
