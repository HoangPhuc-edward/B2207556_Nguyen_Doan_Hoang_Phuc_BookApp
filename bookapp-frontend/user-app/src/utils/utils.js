import borrowService from "@/services/borrow.service";

function formatDate(inputDate) {
  if (!inputDate) {
    return "";
  }
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// 0 la chua tra, 1 la da tra
function checkBorrow(borrow) {
  return borrow.NgayTra ? 1 : 0;
}

const getBookNumber = async (book) => {
  try {
    const borrowList = await borrowService.findByAttribute("MaSach", book._id);
    let count = 0;
    borrowList.forEach((borrow) => {
      if (checkBorrow(borrow) === 0) {
        count++;
      }
    });
    return book.SoQuyen - count;
  } catch (error) {
    console.log(error);
  }
};

const checkBeforeBorrow = async (book) => {
  const bookNumber = await getBookNumber(book);
  return bookNumber > 0;
};

export { formatDate, getBookNumber, checkBeforeBorrow, checkBorrow };
