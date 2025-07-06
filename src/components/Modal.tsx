import React from 'react';
import {Modal, Box} from '@mui/material';
import {CheckCircle, XCircle, Info} from 'lucide-react';
import {AlertType} from "@/types";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
    type?: AlertType;
}

const alertConfig = {
    success: {
        icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto"/>,
        title: 'Success!',
        buttonClass: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
        borderClass: 'border-green-500',
    },
    error: {
        icon: <XCircle className="w-16 h-16 text-red-500 mx-auto"/>,
        title: 'Oops!',
        buttonClass: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
        borderClass: 'border-red-500',
    },
    info: {
        icon: <Info className="w-16 h-16 text-blue-500 mx-auto"/>,
        title: 'Heads up!',
        buttonClass: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
        borderClass: 'border-blue-500',
    },
};

const CombinedModal = ({open, onClose, message, type = 'info'}: ModalProps) => {
    if (!open) {
        return null;
    }

    const config = alertConfig[type];

    return (
        <Modal
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    className: 'bg-black bg-opacity-50',
                }
            }}
            disableAutoFocus
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none',
                }}
            >
                <div
                    className={`
                        bg-white rounded-2xl shadow-2xl p-8 m-4 max-w-sm w-full text-center
                        transform transition-all duration-300 ease-out
                        border-t-8 ${config.borderClass}
                        ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                    `}
                >
                    <div className="mb-4">
                        {config.icon}
                    </div>

                    <h3 id="modal-title" className="text-2xl font-bold text-gray-800 mb-2">
                        {config.title}
                    </h3>

                    <p className="text-gray-600 mb-8">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`
                            w-full py-3 px-4 rounded-lg text-white font-bold
                            transition-transform transform hover:scale-105
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${config.buttonClass}
                        `}
                    >
                        Close
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default CombinedModal;
