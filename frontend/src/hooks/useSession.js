import { useState } from "react";
import { endSession } from "../services/sessionService";
import Swal from "sweetalert2";

export const useSession = ({ resetFile }) => {
  const [sessionId, setSessionId] = useState(null);

  const handleEndSession = async () => {
    if (!sessionId) return;

    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'End Session',
      text: 'Are you sure you want to end this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, end it!',
      cancelButtonText: 'Cancel',
      background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    });

    // If confirmed, proceed with ending the session
    if (result.isConfirmed) {
      try {
        await endSession(sessionId);
        setSessionId(null);
        if (typeof resetFile === 'function') {
          resetFile(); // Reset file state
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return {
    sessionId,
    setSessionId,
    handleEndSession,
  };
};