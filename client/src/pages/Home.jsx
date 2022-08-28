import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { listProducts } from "../redux/actions/product";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container fluid className="my-2 py-2">
      <h4 className="my-4 text-center" >All Products</h4>
      {error && <h1 variant="danger">{error}</h1>}
      {loading && <Loader />}
      <Table striped bordered hover>
        <thead className="bg-primary text-light ">
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 &&
            products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.quantity}</td>
                <td>₹ {prod.amount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
