import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";
import { FallOutlined, RiseOutlined, SearchOutlined } from "@ant-design/icons";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              fontSize: "20px",
              width: "300px"
            }}
            placeholder="Search"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="logo"
                  />
                }
                hoverable
                style={{
                  borderRadius: "20px",
                  overflow: "hidden"
                }}
              >
                <Row justify="space-around" align="center">
                  <Col align="center">
                    <Text>Price</Text>
                    <Title level={4}>{millify(currency.price)}</Title>
                  </Col>
                  <Col align="center">
                    <Text>Market Cap</Text>
                    <Title level={4}>{millify(currency.marketCap)}</Title>
                  </Col>
                  <Col align="center">
                    <Text>Change</Text>

                    <Title
                      level={4}
                      type={currency.change > 0 ? "success" : "danger"}
                    >
                      {currency.change > 0 ? (
                        <RiseOutlined style={{ marginRight: 5 }} />
                      ) : (
                        <FallOutlined style={{ marginRight: 5 }} />
                      )}
                      {millify(currency.change)}%
                    </Title>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
