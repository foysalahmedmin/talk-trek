import { HiDocumentText } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import useIsStudent from "../../../hooks/useIsStudent";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClassCard = ({ classItem }) => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [isStudent] = useIsStudent()
    const { _id, className, classImage, startingDate, price, seats, availableSeats, instructorName, instructorEmail, instructorImage, classCategory } = classItem;
    
    const classAddHandler = () => {
        if (user) {
            axiosSecure.post(`student/selectClass/${user.email}`, {
                studentEmail: user.email,
                classId: _id,
                className,
                classImage,
                instructorName,
                instructorEmail,
                startingDate,
                price,
                classCategory,
            })
                .then(result => {
                    if (result.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Selected',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else if (result.data.message) {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: `${result.data.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'WANT TO SIGN-IN?',
                text: "If you want to select the class you have to sign-in!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8dc63f',
                cancelButtonColor: '#1975bb',
                confirmButtonText: 'Yes, Sign-In!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signIn')
                }
            })
        }
    }
    return (
        <div className="rounded-md overflow-hidden shadow-xl" data-aos="fade-up">
            <div className="relative h-60">
                <img className="w-full h-full object-cover" src={classImage} alt="" />
                <div className="absolute top-0 h-full z-10 w-full bg-gradient-to-l from-black bg-opacity-50"></div>
                <p className="absolute z-20 top-5 left-5 bg-black rounded-md font-bold px-3 py-1 text-primary">${price}</p>
            </div>
            <img className="w-20 h-20 z-20 object-cover shadow-xl relative ml-auto mr-3 -mt-10 rounded-full" src={instructorImage} alt="" />
            <div className={`relative bg-base-300 -mt-10 p-3 ${availableSeats < 1 && 'bg-red-100'}`}>
                <p className="text-xs opacity-50">{classCategory}</p>
                <Link to={`/classDetails/${_id}`}><h1 className="text-primary font-semibold text-3xl hover:tracking-[1px] transition-all cursor-pointer">{className}</h1></Link>
                <p className="uppercase mb-1">With {instructorName}</p>
                <div className="flex gap-5 mb-3">
                    <p>Seats: {seats}</p>
                    <p>Available: {availableSeats}</p>
                </div>
                <div>
                    <button disabled={(user && !isStudent) || (availableSeats < 1)} onClick={() => classAddHandler()} className="primary-btn w-full">Select Class</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;