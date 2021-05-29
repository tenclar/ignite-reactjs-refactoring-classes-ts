import {  useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

interface IFoodFormData { 
  id:number;
  name: string;
  description: string;
  price: string;
  available:boolean;
  image: string;
}

interface IFoodCreateData {
  name: string;
  description: string;
  price: string;
  image: string; 
}


interface IModalProps {  
  isOpen: boolean;  
  handleAddFood: (food:Omit<IFoodFormData, 'id' | 'available'>)=> void;
  setIsOpen: () => void;
}

const  ModalAddFood: React.FC<IModalProps> =({isOpen, handleAddFood,
   setIsOpen}) => {
  const formRef = useRef<FormHandles>(null);
  


  const handleSubmit = useCallback(
    async (data: IFoodCreateData) => {
    handleAddFood(data);
    setIsOpen();
     },[handleAddFood, setIsOpen]
  );

 /*  handleSubmit = async data => {
    const { setIsOpen, handleAddFood } = this.props;

    handleAddFood(data);
    setIsOpen();
  };
 */
/*   render() {
    const { isOpen, setIsOpen } = this.props;
 */
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input  name="image" placeholder="Cole o link aqui" />

          <Input  name="name" placeholder="Ex: Moda Italiana" />
          <Input  name="price" placeholder="Ex: 19.90" />

          <Input   name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  // }
};

export default ModalAddFood;
