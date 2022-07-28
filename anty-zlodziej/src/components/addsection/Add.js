import React, { useState } from "react";
import './Add.scss'


export default function Add({}) {
    const [equipmentCategory, setEquipmentCategory] = useState("21");
    const [equipmentBrand, setEquipmentBrand] = useState("21");
    const [equipmentModel, setEquipmentModel] = useState("21");
    const [equipmentSerialNumber, setEquipmentSerialNumber] = useState(0);
    const [equipmentCheckbox, setEquipmentCheckbox] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
      const save = async () => {
          const res = await fetch("http://localhost:3000/thing", {
              method: "POST",
              body: JSON.stringify({
                  equipmentCategory,
                  equipmentBrand,
                  equipmentModel,
                  equipmentSerialNumber,
                  equipmentCheckbox: equipmentCheckbox ? 'Skradziono' : 'Nie Skradziono'

              }),
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await res.json();
          console.log(data);
      }

        save()

    };

    const labelStyle = { display: "block" };

    return (
        <form onSubmit={handleSubmit} >
           <div className="container container-add">
               <label style={labelStyle}>
                   Rodzaj urządzenia
                   <input
                       className="input input-add"
                       value={equipmentCategory}
                       onChange={(e) => setEquipmentCategory(e.target.value)}
                       type="text"
                       id="equipmentCategory"
                   />
               </label>
               <label style={labelStyle}>
                   Marka
                   <input
                       className="input input-add"
                       value={equipmentBrand}
                       onChange={(e) => setEquipmentBrand(e.target.value)}
                       type="text"
                       id="equipmentBrand"
                   />
               </label>
               <label style={labelStyle}>
                   Model urządzenia
                   <input
                       className="input input-add"
                       value={equipmentModel}
                       onChange={(e) => setEquipmentModel(e.target.value)}
                       type="text"
                       id="equipmentModel"
                   />
               </label>
               <label style={labelStyle}>
                   Numer seryjny urządzenia
                   <input
                       className="input input-add"
                       value={equipmentSerialNumber}
                       onChange={(e) => setEquipmentSerialNumber(e.target.value)}
                       type="text"
                       id="equipmentSerialNumber"
                   />
               </label>

               <label>
                   Zaznacz jeśli chcesz zgłosić kradzież
                   <input
                       className="checkbox checkbox-add-section"
                       value={equipmentCheckbox}
                       onChange={(e) => setEquipmentCheckbox(e.target.checked)}
                       type="checkbox"
                       id="equipmentCheckbox"
                   />
               </label>
               <div className="btn-add-section">

                   <button className="btn btn-add-add-section">Dodaj</button>

               </div>
           </div>


        </form>
    );
}


// linijka 78         <checkbox className="checkbox checkbox-add">Zgłoś kradzież</checkbox>






/*import React, {useState} from "react";
const API = "http://localhost:3000";

export default function Add({ getEquipment}) {
    const [equipmentCategory, setEquipmentCategory] = useState("21");
    const [equipmentBrand, setEquipmentBrand] = useState("21");
    const [equipmentModel, setEquipmentModel] = useState("21");
    const [equipmentsSerialNumber, setEquipmentSerialNumber] = useState("21");
//    const [checkbox, setCheckbox] = useState("21");
//    const [errors, setErrors] = useState([]);
//    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/items", {
            method: "POST",
            body: JSON.stringify({
            equipmentCategory,
            equipmentBrand,
            equipmentModel,
            equipmentsSerialNumber,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        },
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            getEquipment();
        }
    };

    const labelStyle = { display: "block" };

    return (
        <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
                Name
                <input
                    value={equipmentCategory}
                    onChange={(e) => setEquipmentCategory(e.target.value)}
                    type="text"
                    id="equipmentCategory"
                ></input>
            </label>
            <label style={labelStyle}>
                Brand
                <input
                    value={equipmentBrand}
                    onChange={(e) => setEquipmentBrand(e.target.value)}
                    type="text"
                    id="equipmentBrand"
                ></input>
            </label>
            <label style={labelStyle}>
                Equipment Model
                <input
                    value={equipmentModel}
                    onChange={(e) => setEquipmentModel(e.target.value)}
                    type="text"
                    id="equipmentmodel"
                ></input>
            </label>
            <label style={labelStyle}>
                Equipment Serial Number
                <input
                    value={equipmentsSerialNumber}
                    onChange={(e) => setEquipmentSerialNumber(e.target.value)}
                    type="number"
                    id="equipmentserialnumber"
                ></input>
            </label>
            <button>Dodaj</button>
            <checkbox>Zgłoś kradzież</checkbox>
        </form>
    );
}
























/*
    const handleSubmit = (e) => {
        e.preventDefault();
        const _errors = [];

        if (equipmentcategory.lenght < 1) {
            _errors.push("Wymagane pole tekstowe, wypełnij je.");
        }

        if (equipmentbrand.length < 1) {
            _errors.push("Wymagane pole tesktowe, wypełnij je.");
        }

        if (equipmentmodel.length < 1) {
            _errors.push("wymagane pole tekstowe, wypełnij je.");
        }

        if (equipmentserialnumber.length < 1) {
            _errors.push("Wymagane pole tekstowe, wypełnij je.");
        }

        setErrors(_errors);
        setSuccess(false);
        if (_errors.length > 0) {
            return false;
        }

        const object = {
            equipmentcategory,
            equipmentbrand,
            equipmentmodel,
            equipmentserialnumber
        };

        fetch(`${API}/base`, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Błąd")
                }
            })
            .then(data => {
                if (data.status === "success") {
                    setSuccess(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" clasName="adding-text equipment-category" value={equipmentcategory}
                           onChange={e => setEquipmentCategory(e.target.value)}/>
                    <input type="text" className="adding-text equipment-brand" value={equipmentbrand}
                           onChange={e => setEquipmentBrand(e.target.value)}/>
                    <input type="text" className="adding-text equipment-model" value={equipmentmodel}
                           onChange={e => setEquipmentModel(e.target.value)}/>
                    <input type="text" className="adding-text equipment-serial-number" value={equipmentserialnumber}
                           onChange={e => setEquipmentSerialNumber(e.target.value)}/>
                    <>
                        <button onClick={addEquipment}>Dodaj przedmiot</button>
                        <ul>
                            {task.map((task, index) => <li key={index}>{task}</li>)}
                        </ul>
                    </>
                    //<p>Is "My Value" checked? {checkbox.toString()}</p>
                    //<button className="btn btn-adding-section" type="submit">Wyślij</button>
                </form>

                {success && <h2>Form sent!</h2>}
                {errors.map(error => <p key={error}>{error}</p>)}
            </div>
        );

    }
    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };
}









/*              przykladowy select wielu rzeczy

class MyFirstForm extends React.Component {

    state = { value: 'blue' };

    render() {
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="red">Czerwony</option>
                <option value="blue">Niebieski</option>
                <option value="green">Zielony</option>
            </select>
        );
    }
}*/

/*
<div className="container">
    <div >
        <h3>Rejestracja urządzenia<br>do bazy danych </h3>
    </div>
    <div className="adding-text equipment-name">
        <h4>Wpisz nazwę urządzenia</h4>
        <input type="text" className="text-field" placeholder="Wpisz nazwę urządzenia" value/> == $0
    </div>
    <div className="adding-text equipment-brand">
        <h4>Wpisz markę urządzenia</h4>
        <input type="text" className="text-field" placeholder="Wpisz markę urządzenia" value/> == $0
    </div>
    <div className="adding-text equipment-model">
        <h4>Wpisz model urządzenia</h4>
        <input type="text" className="text-field" placeholder="Wpisz model urządzenia" value/> == $0
    </div>
    <div className="adding-text equipment-serial-number">
        <h4>Wpisz numery seryjne</h4>
        <input type="text" className="text-field" placeholder="Wpisz numer seryjny urządzenia" value/> == $0
    </div>
    <div className="chceckbox checkbox-add button-add">
        <input type="checkbox" checked={this.state.isChecked}>Zaznacz jeśli chcesz dodać urządzenie jako kradzione</input>
        <button className="btn btn-add" type=:submit>Dodaj urządzenie</button>
    </div>
</div>

<div>
    <div className="list list-of-equipment">
        <div className="21">

        </div>
    </div>
</div>
 */