
import React, { useEffect, useState } from "react";
import { ImBin2 } from "react-icons/im";


import './Check.scss'

export default function Check() {
    const [equipmentList, setEquipmentList] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        setFiltered(equipmentList.filter(eq => {
            console.log(eq);
            return eq.equipmentSerialNumber.includes(search)
        }))
    }, [search])
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const getEquipment = async () => {
        try {
            const res = await fetch("http://localhost:3000/thing");
            const data = await res.json();
            setEquipmentList(data);
            setFiltered(data);
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        getEquipment();
    }, []);
    const ad = async (id) => {
        console.log("szukaj", id);
        try {
            const res = await fetch("http://localhost:3000/thing", { method: "SEARCH" });
            console.log(res);
            if (res.ok) {
                getEquipment();
            }
        } catch (error) {
            throw new Error(error);
        }
    };


    useEffect(() => {
        getEquipment();
    }, []);
    const Delete = async (id) => {
        console.log("usuń", id);
        try {
            const res = await fetch("http://localhost:3000/thing/"+id, {method: "Delete"});
            console.log(res);
            if (res.ok) {
                getEquipment();
            }
        }catch (error) {
            throw new Error(error);
        }
    };








    return (
        <div className="container container-check">
            <input type="text" value={search} onChange={handleSearch}/>
            <ul>
                {filtered.length !== 0 ? (
                    filtered.map(({id, equipmentCategory, equipmentBrand, equipmentModel, equipmentSerialNumber, equipmentCheckbox }) => {
                        return (
                            <li key={id} className="check-section-things">
                                <div>
                                    {equipmentCategory}
                                    <br />
                                    {equipmentBrand}
                                    <br/>
                                    {equipmentModel}
                                    <br/>
                                    {equipmentSerialNumber}
                                    <br/>
                                    {equipmentCheckbox}
                                </div>
                                <div>
                                    <button className="btn-check-section btn-remove-check-section" onClick={() => Delete(id)}>
                                        <ImBin2 size={15}/>

                                    </button>

                                </div>
                                <hr />

                            </li>


                        );
                    })
                ) : (
                    <li>loading...</li>
                )}
            </ul>
        </div>
    );
}

//







/*  const URL = "http://localhost:3000/thing";
   export default function removesThing() {
       const [thingList, setThingList] = useState(null);
       const getThing = async () => {
           try {
               const res = await fetch(URL);
               const data = await res.json();
               setThingList(data);
           } catch (error) {
               throw new Error(error);
           }
       };
       useEffect(() => {
           getThing();
       }, []);
       const removeThing = async (id) => {
           console.log("remove thing", id);
           try {
               const res = await fetch("http://localhost:3000/thing", { method: "DELETE" });
               console.log(res);
               if (res.ok) {
                   getThing();
               }
           } catch (error) {
               throw new Error(error);
           }
       };
       return (
           <div>
               <AddThings getThings={getThings} />
               <ul>
                   {thingList ? (
                       thingList.map(({ id, name, brand, engine: { type, hp } }) => {
                           return (
                               <li key={id}>
                                   {brand} {name}
                                   <br />
                                   Type: {type} hp: {hp}{" "}
                                   <button onClick={() => removeThing(id)}>usuń</button>
                                   <hr />
                               </li>
                           );
                       })
                   ) :
                   }
               </ul>
           </div>
       );
   }
*/









































//<button className="btn-check-section btn-edit-check-section" onClick={() => ({type: 'EDIT', id:equipmentsSerialNumber})}>Edytuj</button>


// linijka 55    <button onClick={() => removeEquipment(id)}>Usuń</button>

/*
// wersja 3
import React, {useState} from "react";



class ProductCategoryRow extends React.Component {
    render() {
        const equipmentname = this.props.equipmentname;
        return (
            React.createElement("tr", null,
                React.createElement("th",
                    equipmentname)));



    }}


class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            React.createElement("span", { style: { color: 'red' } },
                product.name);


        return (
            React.createElement("tr", null,
                React.createElement("td", null, name),
                React.createElement("td", null, product.price)));


    }}


class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach(product => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    React.createElement(ProductCategoryRow, {
                        category: product.category,
                        key: product.category }));

            }
            rows.push(
                React.createElement(ProductRow, {
                    product: product,
                    key: product.name }));


            lastCategory = product.category;
        });

        return (
            React.createElement("table", null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Price"))),


                React.createElement("tbody", null, rows)));


    }}


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            React.createElement("form", null,
                React.createElement("input", {
                    type: "text",
                    placeholder: "Search...",
                    value: this.props.filterText,
                    onChange: this.handleFilterTextChange }),

                React.createElement("p", null,
                    React.createElement("input", {
                        type: "checkbox",
                        checked: this.props.inStockOnly,
                        onChange: this.handleInStockChange }),

                    ' ', "Only show products in stock")));




    }}


class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false };


        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText });

    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly });

    }

    render() {
        return (
            React.createElement("div", null,
                React.createElement(SearchBar, {
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly,
                    onFilterTextChange: this.handleFilterTextChange,
                    onInStockChange: this.handleInStockChange }),

                React.createElement(ProductTable, {
                    products: this.props.products,
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly })));



    }}

const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];


ReactDOM.render(
    React.createElement(FilterableProductTable, { products: PRODUCTS }),
    document.getElementById('container'));
















/*   wersja 2
function Check() {
    const [equipmentname, setEquipmentName] = useState("21");
    const [equipmentbrand, setEquipmentBrand] = useState("21");
    const [equipmentmodel, setEquipmentModel] = useState("21");
    const [equipmentserialnumber, setEquipmentSerialNumber] = useState("21");
    const [search, setSearch] = useState("21");

//    const [checkbox, setCheckbox] = useState("21");

//    const [errors, setErrors] = useState([]);
//    const [success, setSuccess] = useState(false);

    const handleChange = () => {
        setCheckbox(!checkbox)
    }
//const handleSubmit = (e) => {
//        e.preventDefault();
//        const _errors = [];
//
//        if (equipmentname.lenght < 1) {
//            _errors.push("Wymagane pole tekstowe, wypełnij je.");
//        }
//
//        if (equipmentbrand.length < 1) {
//            _errors.push("Wymagane pole tesktowe, wypełnij je.");
//        }
//
//        if (equipmentmodel.length < 1) {
//            _errors.push("wymagane pole tekstowe, wypełnij je.");
//        }
//
//        if (equipmentserialnumber.length < 1) {
//            _errors.push("Wymagane pole tekstowe, wypełnij je.");
//        }
//
//        setErrors(_errors);
//        setSuccess(false);
//        if (_errors.length > 0) {
//            return false;
//        }
//
        const object = {
            equipmentname,
            equipmentbrand,
            equipmentmodel,
            equipmentserialnumber
        };

        fetch("adres serwera tutaj wpisac", {
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
                    <input type="text" className="adding-text equipment-name" value={equipmentname}
                           onChange={e => setEquipmentName(e.target.value)}/>
                    <input type="text" className="adding-text equipment-brand" value={equipmentbrand}
                           onChange={e => setEquipmentBrand(e.target.value)}/>
                    <input type="text" className="adding-text equipment-model" value={equipmentmodel}
                           onChange={e => setEquipmentModel(e.target.value)}/>
                    <input type="text" className="adding-text equipment-serial-number" value={equipmentserialnumber}
                           onChange={e => setEquipmentSerialNumber(e.target.value)}/>
                    <Checkbox>
                        label = "My value"
                        value = {checkbox}
                        onChange={handleChange}
                    </Checkbox>
                    <p>Is "My Value" checked? {checkbox.toString()}</p>
                    <button className="btn btn-adding-section" type="submit">Wyślij</button>
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
    //};
}







// wersja 4
/*getFilteredUsersForText(text) {
    return new Promise(resolve => {
        const time = (Math.random() + 1) * 250;
        setTimeout(() => {
            const filteredUsers = allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()));
            resolve(filteredUsers);
        }, time) ;
    });
}






// wersja1
class App extends Component {
    state = {
        text: "Przedmiot w bazie danych",
        error: "Przedmiotu nie ma w bazie danych"
    }

    handleNameChange = () => {
        const value = this.ref.text.value
        console.log(value)
        fetch( tutaj serwer      np. "htttp://numbersapi.com/${value}/year?json")
            .then(respons => {
                if(res.ok) {
                    return respons
                }
                throw Error("respons.status")
                console.log(respons)
            })
            .then(respons => console.log("urządzenie znajduje się w bazie danych"))
            .catch(error => {
                this.setState({ text: "urządzenia nie znajduje się w bazie danych"})
            })
    }
    render() {
        return (
            <div>
                <input onChange={this.handleNameChange} type="text" ref="text"/>
                <p>{this.state.text}</p>
            </div>
        );
    }

}




<div>
    <div>

        <div className="container">
            <div >
                <h3>Rejestracja urządzenia<br>do bazy danych </h3>
            </div>
            <div className="adding-text equipment-name">
                <h4>Wpisz nazwę urządzenia</h4>
                <input type="text" className="text-field" placeholder="Wpisz nazwę urządzenia" value name="s"> == $0>
             </div>
            <div className="adding-text equipment-brand">
                <h4>Wpisz markę urządzenia</h4>
                <input type="text" className="text-field" placeholder="Wpisz markę urządzenia">
            </div>
            <div className="adding-text equipment-model">
                <h4>Wpisz model urządzenia</h4>
                <input type="text" className="text-field" placeholder="Wpisz model urządzenia">
            </div>
            <div className="adding-text equipment-serial-number">
                <h4>Wpisz numery seryjne</h4>
                <input type="text" className="text-field" placeholder="Wpisz numer seryjny urządzenia">
            </div>
            <div className="chceckbox checkbox-check button-check">
                <input type="checkbox" checked={this.state.isChecked}/>
                <button>Wyszukaj urządzenie</button>
            </div>
        </div>


    </div>
</div>
*/