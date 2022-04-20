import Modal1 from "./components/Modal1/Modal1";
import Modal2 from "./components/Modal2/Modal2";
import ModalOpener from "./features/Modal/ModalOpener";
import useModal from "./features/Modal/useModal.hook";

const App = () => {
  useModal();

  return (<>
    <ModalOpener targetID="modal1">Окно №1 (маленькое)</ModalOpener>
    <ModalOpener targetID="modal2">Окно №2 (маленькое)</ModalOpener>

    <Modal1 id="modal1"/>
    <Modal2 id="modal2"/>
  </>)
}

export default App;