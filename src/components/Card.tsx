import { useState } from "react"
import { Member } from "../member"

export function Card(props: Member) {
    let src = "";

    if (props.gender == "F") {
        src = "female";
    } else if (props.gender == "M") {
        src = "male";
    } else {
        src = "other";
    }

    const handlePayment = async () => {
        const response = await fetch(`http://localhost:3000/api/members/${props.id}/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            let data = await response.json();
            alert(data.message);
        } else {
            alert("Sikeres befizetés!");
        }
    }

    return (
        <div id="card-container">
            <div id="card-text">
                <h2>{props.name}</h2>
                <p>Született: {props.birth_date.split("T")[0]}</p>
                <p>Csatlakozott: {props.created_at}</p>
            </div>
            <div id="card-image">
                <img src={`./${src}.png`}></img>
            </div>
            <button onClick={handlePayment}>Tagdij befizetes</button>
        </div>
    )
}