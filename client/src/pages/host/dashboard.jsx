import { axiosClient } from "@/api/axios";

function HostDashboard() {
    return (
        <button
            onClick={ ()=>{
                axiosClient.post('/connect-stripe')
            }}
        >
            checkout
        </button>
    );
}

export default HostDashboard;