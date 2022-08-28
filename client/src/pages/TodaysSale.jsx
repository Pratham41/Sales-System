import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { todaysSaleAmount } from "../redux/actions/product";
import Loader from "../components/Loader";

const TodaysSale = () => {
  const dispatch = useDispatch();

  const todaySale = useSelector((state) => state.todaySale);
  const { loading, error, totalAmount } = todaySale;

  useEffect(() => {
    dispatch(todaysSaleAmount());
  }, [dispatch]);
  return (
    <Container className=" my-4 py-4 text-center shadow" >
        <h4 className="my-2" >Today's Total Sale</h4>
      {error && <h1 variant="danger">{error}</h1>}
      {loading && <Loader />}
      <i className="fa-solid fa-hand-holding-dollar fa-4x mb-2"></i>
      {totalAmount?.length > 0 && <h4 className="text-primary mt-2">₹ {totalAmount[0].amount} </h4>}
    </Container>
  );
};

export default TodaysSale;
