import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import icon from "../images/cryptoworld2.png";

const menuItems = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Home"
  },
  {
    key: "cryptocurrencies",
    icon: <FundOutlined />,
    label: "Cryptocurrencies"
  },
  { key: "exchanges", icon: <MoneyCollectOutlined />, label: "Exchanges" },
  { key: "news", icon: <BulbOutlined />, label: "News" }
];

const Navbar = () => {
  const [current, setCurrent] = useState("");
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const onClick = e => {
    setCurrent(e.key);

    navigate(`/${e.key}`);
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoWorld</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          items={menuItems}
          onClick={onClick}
          selectedKeys={[current]}
        />
      )}
    </div>
  );
};

export default Navbar;
