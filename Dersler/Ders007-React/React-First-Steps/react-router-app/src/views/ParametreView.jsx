import { useParams } from "react-router";

const ParametreView = () => {
  const { id } = useParams();
  return <div>Gelen Parametre: {id}</div>;
};

export default ParametreView;
