import { useEffect, useState } from 'react';

import api from '../../services/api';
import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodData } from '../../types';
import { FoodsContainer } from './styles';

export default function Dashboard() {
    const [foods, setFoods] = useState<FoodData[]>([]);
    const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await api.get<FoodData[]>('/foods');

            setFoods(data);
        })();
    }, []);

    async function handleAddFood(food: FoodData) {
        try {
            const { data } = await api.post('/foods', {
                ...food,
                available: true
            });

            setFoods([...foods, data]);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpdateFood(food: FoodData) {
        try {
            const { data: foodUpdated } = await api.put<FoodData>(`/foods/${editingFood.id}`, {
                ...editingFood,
                ...food
            });

            const foodsUpdated = foods.map(f => (f.id !== foodUpdated.id ? f : foodUpdated));
            setFoods(foodsUpdated);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteFood(id: number) {
        try {
            await api.delete(`/foods/${id}`);

            const foodsFiltered = foods.filter(food => food.id !== id);
            setFoods(foodsFiltered);
        } catch (error) {
            console.error(error);
        }
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal() {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: FoodData) {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    return (
        <>
            <Header openModal={toggleModal} />
            <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
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
}
