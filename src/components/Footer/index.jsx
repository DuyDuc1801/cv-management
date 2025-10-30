import "./style.scss";
import { ReconciliationOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer__innerwrap">
          <div className="footer__item">
            <div className="footer__logo">
              <div className="footer__icon">
                <ReconciliationOutlined />
              </div>
              <h3 className="footer__title">IT Jobs</h3>
            </div>
            <p className="footer__slogan">
              Nền tảng tuyển dụng hàng đầu Việt Nam
            </p>
          </div>
          <div className="footer__item">
            <h4 className="">Sản phẩm</h4>
            <ul className="">
              <li>
                <a href="d">Tìm việc làm</a>
              </li>
              <li>
                <a href="d">Top công ty</a>
              </li>
              <li>
                <a href="d">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <h4 className="font-semibold text-white mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="d">Giới thiệu</a>
              </li>
              <li>
                <a href="d">Liên hệ</a>
              </li>
              <li>
                <a href="d">Careers</a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <h4 className="">Hỗ trợ</h4>
            <ul className="">
              <li>
                <a href="d" className="hover:text-white">
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href="d" className="hover:text-white">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="d" className="hover:text-white">
                  Bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" footer__copyright">
        © 2025 JobConnect. All rights reserved.
      </div>
    </>
  );
}

export default Footer;
