const validate = (payload, setInvalifel) => {
    let invalild = 0;
    let fields = Object.entries(payload);
    fields.forEach(item => {
        if (item[1] === "") {
            setInvalifel(prev => [
                ...prev,
                {
                    name: item[0],
                    messeger: "Bạn không được bỏ trống trường này",
                },
            ]);
            invalild++;
        }
    });
    fields.forEach(item => {
        switch (item[0]) {
            case "password":
                if (item[1].length < 6) {
                    setInvalifel(prev => [
                        ...prev,
                        {
                            name: item[0],
                            messeger: "Mật khẩu phải tối thiểu 6 ký tự",
                        },
                    ]);
                    invalild++;
                }
                break;
            case "mobile":
                if (!+item[1]) {
                    setInvalifel(prev => [
                        ...prev,
                        {
                            name: item[0],
                            messeger: "Số điện thoại không hợp lệ",
                        },
                    ]);
                    invalild++;
                }
                break;
            case "email":
                if (!item[1].includes("@gmail.com")) {
                    setInvalifel(prev => [
                        ...prev,
                        {
                            name: item[0],
                            messeger: "Email không hợp lệ!",
                        },
                    ]);
                    invalild++;
                }
                break;
            // case "areaNumber":
            //   if (+item[1] === 0) {
            //     setInvalifel((prev) => [
            //       ...prev,
            //       { name: item[0], messeger: "vui lòng nhập diện tích" },
            //     ]);
            //   }
            //   if (isNaN(item[1])) {
            //     setInvalifel((prev) => [
            //       ...prev,
            //       { name: item[0], messeger: "Vui lòng nhập số" },
            //     ]);
            //   }
            //   break;
            // case "priceNumber":
            //   if (+item[1] === 0) {
            //     setInvalifel((prev) => [
            //       ...prev,
            //       { name: item[0], messeger: "vui lòng nhập số tiền" },
            //     ]);
            //   } else if (+item[1] < 1) {
            //     setInvalifel((prev) => [
            //       ...prev,
            //       { name: item[0], messeger: "Số tiền không hợp lệ" },
            //     ]);
            //   }
            //   if (isNaN(item[1])) {
            //     setInvalifel((prev) => [
            //       ...prev,
            //       { name: item[0], messeger: "Vui lòng nhập số" },
            //     ]);
            //   }

            //   break;

            default:
                break;
        }
    });
    return invalild;
};
export default validate;
