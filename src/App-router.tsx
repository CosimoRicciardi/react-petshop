import { Routes, Route } from "react-router-dom";
import { PetForm } from "./modules/pages/animals/petform";
import { Animals } from "./modules/pages/animals/animals";
import { NotFound } from "./modules/pages/notfound";
import { AnimalCardDetail } from "./modules/pages/animals/A-CardDetail";
import { Homepage } from "./modules/pages/homepage";
import { EditPet } from "./modules/pages/animals/editpet";
import { defaultPet } from "./utils/defaultPet";
import { PetSaved } from "./modules/pages/animals/saved";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/animal">
        <Route index element={<Animals />} />
        <Route path=":_id" element={<AnimalCardDetail />} />
        <Route path=":_id/edit" element={<EditPet />} />
        <Route path="new" element={<PetForm defaultValues={defaultPet} />} />
        <Route path="saved" element={<PetSaved />} />
      </Route>
    </Routes>
  );
};
