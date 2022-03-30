let currentPage = 1;

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

const clickPage = (page) => {
  currentPage = page;
  loadPage(currentPage);
};

const prevPage = () => {
  loadPage(currentPage - 1);
};

const nextPage = () => {
  currentPage = page;
  loadPage(currentPage + 1);
};
