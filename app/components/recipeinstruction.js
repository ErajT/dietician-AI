import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                '& .MuiAccordion-region': {
                  height: 'auto',
                },
                '& .MuiAccordionDetails-root': {
                  display: 'block',
                },
              }
            : {
                '& .MuiAccordion-region': {
                  height: 0,
                },
                '& .MuiAccordionDetails-root': {
                  display: 'none',
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>View Detailed Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'#c6e2cc'}}>
          <Typography >
            1. Rinse 2.5 pounds of chicken thoroughly and pat dry with a paper towel.
            2. Cut the chicken into small pieces and set aside.
            3. Boil 1.5 pounds of white rice in 1 cup of water until it is fully cooked.
            4. Drain the excess water from the cooked rice and set it aside to cool down.
            5. Heat 1 cup of cooking oil in a large pan over medium heat.
            6. Once the oil is hot, add 2 teaspoons of garlic and ginger paste and sauté for about 2 minutes, until fragrant.
            7. Add 1 teaspoon of garlic and ginger paste to the pan and continue to sauté for another minute.
            8. Add 1/2 teaspoon of salt to the pan and mix well.
            9. Add 2 teaspoons of red pepper to the pan and sauté for about 2 minutes, until fragrant.
            10. Add 2 bay leaves to the pan and sauté for 1 minute.
            11. Add the chopped chicken to the pan and cook until it is browned and fully cooked.
            12. Add 4 teaspoons of biryani masala to the pan and mix well.
            13. Add 2 chopped red onions to the pan and sauté until they are translucent.
            14. Once the onions are translucent, add the cooked rice to the pan and mix well.
            15. Add 1 cup of water to the pan if the rice seems dry.
            16. Mix all the ingredients together, ensuring that the rice and chicken are well combined.
            17. Taste the dish and adjust the seasoning if necessary.
            18. Cover the pan with a lid and let the biryani simmer for about 10-15 minutes on low heat.
            19. Once the biryani is cooked, remove the bay leaves from the pan.
            20. Serve the chicken biryani hot, garnished with fresh herbs if desired.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
