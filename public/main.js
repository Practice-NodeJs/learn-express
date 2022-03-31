const loadPage = (page) => {
  $.ajax({
    url: `/account?page=${page}`,
    type: "GET",
  })
    .then((data) => {
      $(".main").html("");

      for (let i of data) {
        let item = $(`
          <h1>${i.username}</h1>
        `);

        $(".main").append(item);
      }
    })
    .catch((err) => console.log("Log :  API lỗi"));
};

loadPage(1);

$(".pagination").pagination({
  dataSource: (done) => {
    $.ajax({
      type: "GET",
      url: `/account`,
      success: (data) => {
        done(data);
      },
    });
  },
  pageSize: 4,
  afterPageOnClick: (e, page) => {
    loadPage(page);
  },
  afterPreviousOnClick: (e, page) => {
    loadPage(page);
  },
  afterNextOnClick: (e, page) => {
    loadPage(page);
  },
});
