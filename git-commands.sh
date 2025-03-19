# Create a backup of your modified file
cp src/pages/accomodation/components/Accordion/AccordionStyled.ts src/pages/accomodation/components/Accordion/AccordionStyled.ts.backup

# Discard local changes to allow the pull
git checkout -- src/pages/accomodation/components/Accordion/AccordionStyled.ts

# Pull from remote
git pull

# After the pull, you can manually merge your changes from the backup file if needed
