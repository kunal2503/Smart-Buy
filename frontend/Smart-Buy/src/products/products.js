

const products = [
    {
      id: 1,
      name: "Apple iPhone 15",
      description: "Latest iPhone with A16 chip",
      price: 999,
      imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcROrp7WcQe0ELMs1Dy3p0aRWEyvQcdkSAh_uxhvwT2iwbXL4VoPGJ9sgq7n1CgPQ6w1xbaEj2T7abrMARjUolAIrhXaDD8DOqWaa0aM1ttHlyVA9SQ3jYEPCiIfBB8YNDb008uOc_4&usqp=CAc",
      category: "Smartphones"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      description: "Powerful Android flagship",
      price: 899,
      imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR48DM0izYTRjOn4mY1R6qevgiC62gftSW3jlczrvuvPQVRFc0Ktx4s4hn3IL-xxPr7dstrXqDSB_4QF7VRFfs_qAmP2E_SUOwIH-D6LKZAhXTKhDrTBZ-AsWqBrtzYuI67MjTpsA&usqp=CAc",
      category: "Smartphones"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      description: "Noise-cancelling headphones",
      price: 399,
      imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCOt9hEGyJrE_IGF97BP8F5Y6uBmQ6-lUrCXW6eHESgQAKhA-gcGLFbU_HT9x21wPrIJZVxpj_tC2Bg0kJT0LJu-mJ2SJEMn6P_OHRhjA-TjSgSUykGCO2WrkFpifaPh39Adc9ZgE&usqp=CAc",
      category: "Accessories"
    },
    {
      id: 324,
      name: "Dell XPS 13",
      description: "Compact and powerful laptop",
      price: 1299,
      imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQZnDpbIwhYuX_Z8Q49ZEq-L8VpeVDU_3yD2NEW4_-7mamq3MO72tUCw_fSIodmWFoDT8Q4Jah4A6QP19v1Pj6TLK8c2YK2zsYmeTCkejohtlX71ri4YuIlDggzmlr7q-ropR2WM3DXzCk&usqp=CAc",
      category: "Laptops"
    },
    {
      id: 985,
      name: "Apple Watch Series 9",
      description: "Health-focused smartwatch",
      price: 499,
      imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
      category: "Accessories"
    },{
        id: 875,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 365,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 598,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 553,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 521,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 54,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },{
        id: 3222,
        name: "Apple Watch Series 9",
        description: "Health-focused smartwatch",
        price: 499,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFR_de0jrxuo-EJJp9IesKiXnGPObYqcIP0kwRNn_AUM0ZhHKjvHs_z6x0TAWwOHCzxIqvOcdU4XPsKSkVWaUl0Hg2Uhh-0EIxo8lPXrgDrvgEH_gttDpTpzNHAy4rnLiW2n8ecA&usqp=CAc",
        category: "Accessories"
      },
  ];
  
  export default products;
  