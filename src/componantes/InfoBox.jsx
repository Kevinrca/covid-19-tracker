import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css"

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <div>
            <Card 
                className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
                onClick={props.onClick} >
                    
                <CardContent>

                    <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--greed"}`}>
                        {cases}
                    </h2>

                    <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;