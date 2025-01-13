class APIFeatures {
  constructor(query, quertString) {
    this.query = query;
    this.queryString = quertString;
  }

  filter() {
    const queryObj = { ...this.queryString }; //copy obj

    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    //1b) ADVANCED FILTERING
    let quertStr = JSON.stringify(queryObj);
    quertStr = quertStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(quertStr));
    //let query = Tour.find(JSON.parse(quertStr)); //build query}

    //console.log(this);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage') // tours?sort=-price,ratingsAverage
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
      // 127.0.0.1:3000/api/v1/tours?fields=name,duration,difficulty,price
      // 127.0.0.1:3000/api/v1/tours?fields=-name,-duration
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // to no
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //page=2&limit=10, 1-10,page1 ,11-20, page2, 21-30,page3
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
