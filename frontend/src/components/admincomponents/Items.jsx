import React from 'react';

const Items = (props) => {
    const handleRemove = (id) => {
        props.onRemove(id);
    };

    const handleEdit = (id) => {
        props.onEdit(id);
    };

    return (
        <div className="product-item max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img src={props.product.imageUrl} className="w-full product-image" alt={props.product.productName} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.product.productName}</div>
                <p className="text-gray-700 text-base">{props.product.description}</p>
                <p className="text-gray-900 font-bold"><strong>Price:</strong> ${props.product.price}</p>
                <p className="text-gray-700">Remaining: {props.product.quantity}</p>
                <div className="flex mt-4">
                    <button
                        onClick={() => handleEdit(props.product.productId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleRemove(props.product.productId)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Items;
