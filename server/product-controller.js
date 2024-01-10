const Product = require("./product_schema");

/*
filtering
1. category
2. brand               if category selected brands will be shown
3. price range          ex: 100 to 500, 600 to 1000                     min:10   max:2000
4. discount range       ex: 10% and above                               min:2     max:20

sorting
1. price                low-to-high/high-to-low

Pagination
10 products per page

*/

exports.fetch_all_products = async (req, resp) => {
  console.log(req.query);
  const {
    category,
    brand,
    min_price,
    max_price,
    price_sort,
    discount_sort,
    min_discount,
    page_no,
  } = req.query;

  //create query add sorting object
  let query = {};
  let sorting = {};

  // pagination conditions
  let pageNo = page_no || 1;
  let products_per_page = 10;

  try {
    // filtering conditions
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    // price range filtering
    if (min_price && max_price) {
      query.price = { $gte: Number(min_price), $lte: Number(max_price) };
    }
    //discount range filtering
    if (min_discount) {
      query.discountPercentage = { $gte: Number(min_discount) };
    }

    // sorting conditions
    if (price_sort) {
      if (price_sort === "low-to-high") {
        sorting.price = 1;
      } else if (price_sort === "high-to-low") {
        sorting.price = -1;
      }
    }

    if (discount_sort) {
      if (discount_sort === "low-to-high") {
        sorting.discountPercentage = 1;
      } else if (discount_sort === "high-to-low") {
        sorting.discountPercentage = -1;
      }
    }

    //count total number of products and total pages(after filtering if filters applied) before pagination
    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / products_per_page);

    //filtering, sorting, pagination according to query
    const products = await Product.find(query)
      .sort(sorting)
      .skip((pageNo - 1) * products_per_page)
      .limit(products_per_page);

    resp.send({
      success: true,
      data: products,
      totalCount: totalCount,
      totalPages: totalPages,
    });
  } catch (err) {
    resp.send({ success: false, message: err });
  }
};
