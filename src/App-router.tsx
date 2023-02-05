import { Routes, Route } from "react-router-dom";
import { AddPet } from "./modules/pages/animals/addpet";
import { Animals } from "./modules/pages/animals/animals";
import { NotFound } from "./modules/pages/notfound";
import { AnimalCardDetail } from "./modules/pages/animals/animal-detail";
import { Homepage } from "./modules/pages/homepage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/animal">
        <Route index element={<Animals />} />
        <Route path=":_id" element={<AnimalCardDetail/>}/>

        (//vedi usedetails dalla repo )


        <Route path="new" element={<AddPet />} />
      </Route>
      (/* stessa homepage e animal*/)
    </Routes>
  );
};
