import React from "react";
import millify from "millify";
import { Row, Col, Typography, Avatar, Card } from "antd";

import { useGetCryptoExchangesQuery } from "../services/cryptoExchangesApi";
import Loader from "./Loader";

const { Text, Title } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>
          <Title level={4}>Trust Score Rank</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>24h Trade Volume</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Year Established</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Country</Title>
        </Col>
      </Row>
      <Row>
        {exchangesList.map(exchange => (
          <Col span={24}>
            <a href={exchange.url}>
              <Card hoverable style={{ borderRadius: "10px", margin: "6px" }}>
                <Row key={exchange.id}>
                  <Col span={6}>
                    <Text>
                      <strong>{exchange.trust_score_rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={exchange.image} />
                    <Text>
                      <strong>{exchange.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                  <Col span={6}>{exchange.year_established}</Col>
                  <Col span={6}>{exchange.country}</Col>
                </Row>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
