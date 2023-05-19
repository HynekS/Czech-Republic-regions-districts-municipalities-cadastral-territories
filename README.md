# Czech-Republic-regions-districts-municipalities-cadastral-territories

This is a repo based on [public data](https://www.cuzk.cz/Katastr-nemovitosti/Poskytovani-udaju-z-KN/Ciselniky-ISKN/Ciselniky-katastralnich-uzemi-a-pracovist-resortu.aspx) provided by the [State Administration of Land Surveying and Cadastre](https://www.cuzk.cz/en).

The aim of this repo is to convert the public data to a clear hierarchy: **Region > District > Municipality > Cadastral territory**.

- Clean up the original .csv file, convert to proper encoding,
- Create a version with/without metadata (number codes, etc.),
- Create a node script to convert the csv to a JSON tree.

The resulting JSON tree is part of this repo, as is the conversion script.
