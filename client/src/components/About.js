import Config from "../configs/configs"
const { SOURCE_CODE_URL } = Config
const About = () => {
    return (
        <div className="my-[5%] mx-[13.5%] text-orange-400">

            <p>
                <br />
                <label className="text-3xl font-bold">Food Delivery App (<a href={SOURCE_CODE_URL} target="_blank" className="text-lg hover:underline text-gray-700 px-2" rel="noreferrer">View Source Code</a>)</label>
                <br />
                <br />
                <label className="text-xl font-bold">Overview</label>
                <p className="text-gray-700 font-semibold">This project aims to develop a food delivery app that utilizes Swiggy's API to fetch data for restaurants and menu items. The app is built using React for the frontend and Node.js for the backend.</p>
                <br />
                <label className="text-xl font-bold">Technology Stack</label>
                <br />
                <ul className="text-md marker:text-orange-500 list-disc pl-10  ">
                    <li><b>Frontend:</b> <span className="text-gray-700 font-semibold">ReactJS</span></li>
                    <li><b>Backend:</b><span className="text-gray-700 font-semibold"> Node.js</span></li>
                    <li><b>API Integration:</b><span className="text-gray-700 font-semibold"> Swiggy API</span></li>
                </ul>
                <br />
                <label className="text-xl font-bold">Features</label>
                <br />
                <ul className="text-md marker:text-orange-500 list-disc pl-10  text-gray-700 font-semibold">
                    <li>Browse and search for restaurants based on location, cuisine, or other filters.</li>
                    <li>View detailed restaurant information, including menu items, ratings, and reviews.</li>
                    <li>Add items to the cart to place orders.</li>
                </ul>
                <br />
                <label className="text-xl font-bold">Architecture</label>
                <br />
                <p className="text-md text-gray-700 font-semibold">The application follows a client-server architecture with a separation of concerns between the frontend and backend components.</p>
                <br />
                <label className="text-lg font-bold">Frontend (ReactJS)</label>
                <p className="text-md text-gray-700 font-semibold">The frontend is built using React, a popular JavaScript library for building user interfaces. It handles the rendering of the app's UI, user interactions, and communication with the backend via API calls.</p>
                <br />
                <label className="text-lg font-bold">Backend (Node.js)</label>
                <p className="text-md text-gray-700 font-semibold">The backend is developed using Node.js, a JavaScript runtime environment that allows running JavaScript on the server-side. It serves as the intermediary between the frontend and the Swiggy API, handling API requests and responses, as well as any additional business logic or data processing required.</p>
                <br />
                <label className="text-lg font-bold">API Integration (Swiggy API)</label>
                <p className="text-md text-gray-700 font-semibold">The app integrates with Swiggy's API to fetch restaurant and menu data. The backend communicates with the Swiggy API, retrieves the necessary data, and serves it to the frontend as needed.</p>
            </p>
        </div>
    )
}

export default About