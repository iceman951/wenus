import Swal from "sweetalert2";

const ConfirmWarning = Swal.mixin({
  position: "center",
  showConfirmButton: true,
  confirmButtonText: "ยืนยัน",
  showCancelButton: true,
  cancelButtonText: "ยกเลิก",
  confirmButtonColor: "red",
  iconColor: "red",
});

export const alertWarning = ({ message, onClickButton }) => {
  ConfirmWarning.fire({
    icon: "warning",
    title: message,
  }).then((res) => onClickButton(res));
};
