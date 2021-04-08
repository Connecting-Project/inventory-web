import React from 'react';
import '../../assets/css/product.css';
import { useHistory } from 'react-router-dom';

function ProductListSection({ productlist, productPageNo }) {
    const history = useHistory();

    const onGoProductDetail = (id) => {
        history.push(`/product/${id}`);
    }

    return (
        <table className="productlist_table">
            <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />

            </colgroup>
            <thead>
                <tr>
                    <td>Sn</td>
                    <td>제품명</td>
                    <td>제조업체</td>
                    <td>수량</td>
                    <td>남은수량</td>
                </tr>
            </thead>
            <tbody>
                {productlist && productlist.map((product, index) => {
                    if((productPageNo-1)*10<= index && index < productPageNo*10){
                        return(
                            <tr key={product.id} className="product_list_product" onClick={()=>{onGoProductDetail(product.id)}}>
                                {/* <td><img src={`data:image/png;base64,${product.picture}`} alt="product_img"/></td> */}
                                <td>{product.sn}</td>
                                <td>{product.productname}</td>
                                <td>{product.manufacturer}</td>
                                <td>{product.quantity}</td>
                                <td>{product.stock}</td>
                            </tr>
                        )
                    }else{
                        return null;
                    }
                })}
            </tbody>
        </table>
    )
}

export default ProductListSection;