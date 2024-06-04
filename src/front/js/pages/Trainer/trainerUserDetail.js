import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


import Loader from "../../component/User/loader.jsx";
import TrainerExercise from '../../component/Trainer/trainerExercise.jsx';

import "../../../styles/Trainer-styles/trainerUserDetails.css";

const TrainerUserDetail = () => {
    const { userId } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        user_age: '',
        user_height: '',
        user_weight: '',
        user_illness: '',
        user_objetives: ''
    });

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetch(`${process.env.BACKEND_URL}/user_data/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + store.token
                }
            });
            if (userData.ok) {
                const data = await userData.json();
                setFormData(data);
            } else {
                Swal.fire({ title: "Error", text: "Error fetching user data", type: "error", showConfirmButton: false, timer: 1000 });
            }
        }
        getUserData();
    }, []);



    if (!formData) {
        return (
            <>
                <h4>Loading...</h4>
                <Loader />
            </>
        );
    }

    return (
        <>
            <div className='personalTrainerData'>
                <div className='user-info'>
                    <p className='dataForm'>Full Name: {formData.user_name}</p>
                    <p className='dataForm'>Weight: {formData.user_weight}</p>
                    <p className='dataForm'>Illness: {formData.user_illness}</p>
                    <p className='dataForm'>Height: {formData.user_height}</p>
                    <p className='dataForm'>Objectives: {formData.user_objetives}</p>
                </div>
            </div>
            <TrainerExercise />
        </>
    );
};

export default TrainerUserDetail