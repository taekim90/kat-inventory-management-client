import axios from "axios"
import { useState } from "react"
import Search from "../../Search"
import DrugList from "./DrugList"


export default function EditMedicine ({inventoryList, setInventoryList, showForm, setShowForm}) {
    const [form, setForm] = useState({
        genericName: "",
        brandName: "",
        manufacturerName: "",
        productType: "",
        route: "",
        usedFor: "",
        unitCount: 0
    })

    const [showList, setShowList] = useState(false)


    const submitForm = (e) => {
        e.preventDefault()
        console.log(form)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${form._id}`, form)
            .then(response => {
                setInventoryList([...inventoryList, form])
                setShowForm(!showForm)
            })       
    }
    return(
        <>
            <div className="flex-container">
            <h3>Edit Medicine</h3>
            </div>
            
            
            <Search inventoryList={inventoryList} setInventoryList={setInventoryList} setShowList={setShowList} />

           { showForm ? 
           
           <div className="flex-container">    
           <div className="form-container">
            <form onSubmit={submitForm}>
                <label htmlFor="genericName">Generic Name:</label>
                <input type="text" name="genericName" id="genericName" value={form.genericName} onChange={(e) => {setForm({...form, genericName: e.target.value})}}/>

                <label htmlFor="brandName">Brand Name: </label>
                <input type="text" name="brandName" id="brandName" value={form.brandName} onChange={(e) => {setForm({...form, brandName: e.target.value})}}/>

                <label htmlFor="manufacturerName">Manufacturer: </label>
                <input type="text" name="manufacturerName" id="manufacturerName" value={form.manufacturerName} onChange={(e) => {setForm({...form, manufacturerName: e.target.value})}}/>

                <label htmlFor="productType">Product Type: </label>
                <input type="text" name="productType" id="productType" value={form.productType} onChange={(e) => {setForm({...form, productType: e.target.value})}}/>

                <label htmlFor="route">Route: </label>
                <input type="text" name="route" id="route" value={form.route} onChange={(e) => {setForm({...form, route: e.target.value})}}/>

                <label htmlFor="usedFor">Used For: </label>
                <input type="text" name="usedFor" id="usedFor" value={form.usedFor} onChange={(e) => {setForm({...form, usedFor: e.target.value})}}/>

                <label htmlFor="unitCount">Unit Count: </label>
                <input type="number" name="unitCount" id="unitCount" value={form.unitCount} onChange={(e) => {setForm({...form, unitCount: e.target.value})}}/>
                
                <input type="submit" value="Submit" />
            </form>
            </div></div>
            : null
            }
            {
                showList ? <DrugList inventoryList={inventoryList} setInventoryList={setInventoryList}  setForm={setForm} setShowForm={setShowForm} setShowList={setShowList} showList={showList} /> : null
            }
        </>
    )
}