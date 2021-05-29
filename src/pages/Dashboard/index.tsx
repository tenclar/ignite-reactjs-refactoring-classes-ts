import {  useCallback, useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFoodFormData { 
  id:number;
  name: string;
  description: string;
  price: string;
  available:boolean;
  image: string;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodFormData[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodFormData>({} as IFoodFormData );

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  

  
     useEffect(()=>{
      async function loadFoods() {
        const response = await api.get('/foods');  
        setFoods(response.data);
      }
      loadFoods();
    },[]);

  
   
    const handleAddFood = useCallback(
      async(food:Omit<IFoodFormData, 'id' | 'available'>): Promise<void> => {
        try {
          const response = await api.post('/foods', {
            ...food,
            available: true,
          });
    
          setFoods([...foods, response.data]);
        } catch (err) {
          console.log(err);
        } 
      },[foods],
    );

 

  const handleUpdateFood = useCallback(
    async(data:Omit<IFoodFormData, 'id'|'available'>):Promise<void> => {
      try {
        const response = await api.put(`/foods/${editingFood.id}`, {
          ...editingFood,
         ...data,
        });
  
        setFoods(
            foods.map(m => 
              m.id=== editingFood.id ? { ...response.data}: m, 
          ),
        );
      } catch (err) {
        console.log(err);
      } 
    },[editingFood, foods],
  );



  const handleDeleteFood = useCallback(
    async(id:Number):Promise<void> => {
      try {
         await api.delete(`/foods/${id}` );
        const foodsFiltered = foods?.filter(food => food.id !== id)
        setFoods(foodsFiltered);
      } catch (err) {
        console.log(err);
      } 
    },[foods],
  );

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }


  function handleEditFood(food:IFoodFormData): void {
     setEditingFood(food);
     toggleEditModal();   
  };

  
    

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />

        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  
};

export default Dashboard;
