import React from 'react';
import "../../assets/css/product.css";

function ProductCreateBtn({setPdCreate}){

    const onProductCreateHandler = () => {
        setPdCreate(true);
    }

    return(
        <div className="admin_pdbtn">
            <button onClick={onProductCreateHandler}>제품 생성</button>
        </div>
    );
}

export default ProductCreateBtn;