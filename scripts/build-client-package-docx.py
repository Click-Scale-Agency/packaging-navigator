#!/usr/bin/env python3
# Generates public/ppwr-klienta-paketes-sablons.docx — the Word version of the
# PPWR client data package template. Mirrors the Markdown template
# (public/ppwr-klienta-paketes-sablons.md); keep the two in sync when editing.
#
# Requires python-docx:  pip install python-docx
# Run from repo root:     python3 scripts/build-client-package-docx.py
import os

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Pt, RGBColor

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "ppwr-klienta-paketes-sablons.docx")

GREY = RGBColor(0x80, 0x80, 0x80)
HEADER_FILL = "E6E6E6"


def set_cell_bg(cell, hex_fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    tc_pr.append(shd)


def add_table(doc, headers, rows, widths=None):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = ""
        run = hdr[i].paragraphs[0].add_run(h)
        run.bold = True
        run.font.size = Pt(9.5)
        set_cell_bg(hdr[i], HEADER_FILL)
    for row in rows:
        cells = table.add_row().cells
        for i, val in enumerate(row):
            cells[i].text = ""
            run = cells[i].paragraphs[0].add_run(val)
            run.font.size = Pt(9.5)
            if val.startswith("["):
                run.font.color.rgb = GREY
    if widths:
        for row in table.rows:
            for i, w in enumerate(widths):
                row.cells[i].width = w
    return table


def add_hr(doc):
    p = doc.add_paragraph()
    p_pr = p._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "808080")
    borders.append(bottom)
    p_pr.append(borders)


def main():
    doc = Document()
    doc.core_properties.title = "PPWR iepakojuma datu pakete"
    doc.core_properties.author = "ppwr.clickscale.dev"

    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(10.5)

    doc.add_heading("PPWR iepakojuma datu pakete klientam", level=0)
    doc.add_paragraph(
        "Šablons, ko piegādātājs aizpilda katram SKU un dod klientam, kurš preci pārdod tālāk vai "
        "eksportē. Lauki kvadrātiekavās [ … ] ir aizpildāmi."
    )

    note = doc.add_paragraph()
    note.add_run("Kā lietot. ").bold = True
    note.add_run(
        "Ja iepakojums nes klienta zīmolu, PPWR izpratnē izgatavotājs ir klients; piegādātājs sniedz "
        "šos datus klienta ES atbilstības deklarācijas (DoC) sagatavošanai (Regulas (ES) 2025/40 "
        "16. pants). Šī pakete apkopo datus, ko klients ievieto savā DoC, tehniskajā dokumentācijā "
        "un EPR atskaitēs."
    )
    set_cell_bg  # noqa: keep import usage explicit
    note_pr = note._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), "F2F2F2")
    note_pr.append(shd)

    add_hr(doc)

    for label, value in [
        ("Piegādātājs:", " [uzņēmums, reģ. nr., adrese, kontaktpersona]"),
        ("Klients / saņēmējs:", " [uzņēmums]"),
    ]:
        p = doc.add_paragraph()
        p.add_run(label).bold = True
        p.add_run(value)
    p = doc.add_paragraph()
    p.add_run("Sagatavots:").bold = True
    p.add_run(" [datums]   ·   ")
    p.add_run("Versija:").bold = True
    p.add_run(" [v1.0]   ·   ")
    p.add_run("Derīgums:").bold = True
    p.add_run(
        " dati atbilst stāvoklim norādītajā datumā; par izmaiņām iepakojumā informēsim [X] darba "
        "dienu laikā."
    )

    doc.add_heading("1. Produkts un lomas", level=1)
    add_table(
        doc,
        ["Lauks", "Vērtība"],
        [
            ["SKU / artikuls", ""],
            ["Produkta nosaukums", ""],
            ["Zīmols uz iepakojuma", "[mūsu / klienta / bez zīmola]"],
            ["PPWR izgatavotāja loma šim SKU", "[mēs / klients — skat. piezīmi ievadā]"],
            ["Lietošanas veids", "[vienreiz lietojams / atkārtoti lietojams]"],
            ["Atkārtotas lietošanas sistēma (ja attiecas)", "[apraksts, 11. pants]"],
        ],
        widths=[Pt(200), Pt(240)],
    )

    doc.add_heading("2. Iepakojuma vienības un sastāvs", level=1)
    doc.add_paragraph(
        "Aizpildi katru līmeni, kas attiecas uz šo SKU. Svars norādāms gramos par vienu vienību. "
        "Katrs materiāls un komponente tiek uzskaitīts atsevišķi."
    )
    doc.add_paragraph().add_run(
        "Pārdošanas (primārais) iepakojums — viena vienība ar komponentēm:"
    ).bold = True
    add_table(
        doc,
        ["Komponente", "Materiāls", "CN kods", "Svars, g", "Pārstrādātais saturs, %", "Pārstrādājamība", "Piezīmes"],
        [
            ["Pamatiepakojums (piem., burka)", "", "", "", "", "", ""],
            ["Noslēgs (piem., vāciņš)", "", "", "", "", "", ""],
            ["Etiķete", "", "", "", "", "", ""],
            ["Cits", "", "", "", "", "", ""],
        ],
    )
    doc.add_paragraph().add_run("Grupētais (sekundārais) iepakojums — ja ir:").bold = True
    add_table(
        doc,
        ["Komponente", "Materiāls", "Svars, g", "Pārstrādātais saturs, %", "Uz cik pārdošanas vienībām", "Piezīmes"],
        [["", "", "", "", "", ""], ["", "", "", "", "", ""]],
    )
    doc.add_paragraph().add_run(
        "Transporta (terciārais) iepakojums — katra vienība atsevišķi:"
    ).bold = True
    add_table(
        doc,
        ["Vienība", "Materiāls", "Svars, g", "Pārstrādātais saturs, %", "Uz cik produkta vienībām", "Piezīmes"],
        [
            ["Kaste", "", "", "", "", ""],
            ["Pildmateriāls", "", "", "", "", ""],
            ["Līmlente", "", "", "", "", ""],
            ["Palete / plēve", "", "", "", "", ""],
        ],
    )

    doc.add_heading("3. Iepakojuma minimizācija un tukšā telpa", level=1)
    add_table(
        doc,
        ["Lauks", "Vērtība"],
        [
            ["Minimizācijas pamatojums", "[kāpēc iepakojums nav samazināms tālāk — svars, apjoms, aizsardzība, 10. pants]"],
            ["Tukšās telpas koeficients (grupētajam / transporta / e-komercijas)", "[%, mērķis ≤ 50 %; piemērošanas datums jāpārbauda oficiālajā avotā, 24. pants]"],
            ["Novērstie liekie slāņi / dubultā iepakošana", "[apraksts, ja attiecas]"],
        ],
        widths=[Pt(200), Pt(240)],
    )

    doc.add_heading("4. Atbilstība un vielas", level=1)
    add_table(
        doc,
        ["Lauks", "Vērtība"],
        [
            ["ES atbilstības deklarācijas (DoC) Nr.", "[ja izgatavotājs esam mēs]"],
            ["Pārstrādājamības novērtējums / klase", "[dizains pārstrādei, mono vai kompozīts, klase, ja noteikta, 6. pants]"],
            ["Vielu atbilstība — PFAS (pārtikas saskarē)", "[apliecinām / testu atskaites pēc pieprasījuma, 5. pants]"],
            ["Vielu atbilstība — smagie metāli (Pb, Cd, Hg, Cr VI)", "[summa ≤ 100 ppm — apliecinām / testu atskaites pēc pieprasījuma]"],
            ["Marķējums uz iepakojuma", "[materiālu sastāva / šķirošanas marķējums, ja jau ir, 12. pants]"],
            ["Tehniskās dokumentācijas pieejamība", "[pēc pieprasījuma [X] darba dienās]"],
        ],
        widths=[Pt(200), Pt(240)],
    )

    doc.add_heading("5. EPR aprēķinu palīgtabula klientam", level=1)
    doc.add_paragraph(
        "Iepakojuma svars uz vienu pārdoto produkta vienību, kg. Iekļauj visus iepakojuma līmeņus, "
        "kas attiecināmi uz vienu vienību (pārdošanas + attiecīgā daļa no grupētā un transporta "
        "iepakojuma) — EPR maksā par visu tirgū laisto iepakojumu, ne tikai pārdošanas vienību."
    )
    add_table(
        doc,
        ["Materiāls", "kg / pārdotā vienība"],
        [[m, ""] for m in ["Papīrs / kartons", "Plastmasa", "Stikls", "Metāls", "Koks", "Kompozīts"]],
        widths=[Pt(260), Pt(180)],
    )
    doc.add_paragraph(
        "Reizini katru vērtību ar attiecīgajā valstī pārdoto vienību skaitu, lai iegūtu gada apjomu "
        "EPR atskaitei. Valstu reģistri un indikatīvās likmes: ppwr.clickscale.dev"
    )

    doc.add_heading("6. Paraksts", level=1)
    doc.add_paragraph("[Vārds, amats, paraksts, datums]")

    add_hr(doc)
    disc = doc.add_paragraph()
    run = disc.add_run(
        "Šī pakete ir informatīva un sagatavota labā ticībā; tā neaizstāj saņēmēja pienākumu izvērtēt "
        "savas PPWR saistības un pārbaudīt datus oficiālajā avotā. Pantu numuri un piemērošanas datumi "
        "(īpaši tukšās telpas un marķējuma prasības) jāpārbauda pret Regulas (ES) 2025/40 tekstu. "
        "Šablons: ppwr.clickscale.dev (MIT, brīvi izmantojams)."
    )
    run.italic = True
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    disc.alignment = WD_ALIGN_PARAGRAPH.LEFT

    doc.save(os.path.normpath(OUT))
    print("Wrote", os.path.normpath(OUT))


if __name__ == "__main__":
    main()
