const nrp = document.querySelector('button[data-nrp]').attributes["data-nrp"].value;
const klsid = document.querySelector('button[data-klsid]').attributes["data-klsid"].value;
const hadir = 'H'
const sakit = 'S'
const izin = 'I'
const alpha = 'A'

// Create an array to store the elements with the classes we want
const classes = [];
const tm_ids = [];
const matchingTbodys = [];

// Get all elements in the document
const allElements = document.querySelectorAll('*');

// Loop through all elements
allElements.forEach(element => {
    // Get the class attribute of each element
    const classAttribute = element.getAttribute('class');

    if (classAttribute) {
        // Split the class attribute into individual class names
        const classNames = classAttribute.split(' ');

        // Loop through the class names and check for the prefixes we want
        classNames.forEach(className => {
            if (className.startsWith('alpha-')) {
                classes.push(element);

                if (!tm_ids.includes(className.split('-')[1])) {
                    tm_ids.push(className.split('-')[1]);
                }

            } else if (className.startsWith('izin-')) {
                classes.push(element);
            } else if (className.startsWith('none-')) {
                classes.push(element);
            } else if (className.startsWith('berita-acara')) {
                classes.push(element);
            }
        });
    }
});

// Get all tbody elements in the document
const tbodyElements = document.querySelectorAll('tbody');

// Iterate through the tbody elements
tbodyElements.forEach(tbody => {
    // Check if the innerHTML contains the text "Topik Perkuliahan:"
    if (tbody.innerHTML.includes('Topik Perkuliahan:')) {
        matchingTbodys.push(tbody);
    }
});

let absen = (jenis_hadir_izin_mhs, id_tm) => {
    let file = new File([''], '|');
    let container = new DataTransfer();
    container.items.add(file);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://presensi.its.ac.id/kehadiran-mahasiswa/updateizinmhs';
    form.style.display = 'none';
    form.enctype = 'multipart/form-data';

    const input_jenis_hadir_izin_mhs = document.createElement('input');
    input_jenis_hadir_izin_mhs.type = 'text';
    input_jenis_hadir_izin_mhs.name = 'jenis_hadir_izin_mhs';
    input_jenis_hadir_izin_mhs.value = jenis_hadir_izin_mhs;

    const input_id_tm = document.createElement('input');
    input_id_tm.type = 'text';
    input_id_tm.name = 'id_tm';
    input_id_tm.value = id_tm;

    const input_id_kelas = document.createElement('input');
    input_id_kelas.type = 'text';
    input_id_kelas.name = 'id_kelas';
    input_id_kelas.value = klsid;

    const input_nrp = document.createElement('input');
    input_nrp.type = 'text';
    input_nrp.name = 'nrp';
    input_nrp.value = nrp;

    const input_alasan_izin_mhs = document.createElement('input');
    input_alasan_izin_mhs.type = 'text';
    input_alasan_izin_mhs.name = 'alasan_izin_mhs';
    input_alasan_izin_mhs.value = '';

    const input_file_izin_mhs = document.createElement('input');
    input_file_izin_mhs.type = 'file';
    input_file_izin_mhs.name = 'file_izin_mhs';
    input_file_izin_mhs.files = container.files;

    form.appendChild(input_jenis_hadir_izin_mhs);
    form.appendChild(input_id_tm);
    form.appendChild(input_id_kelas);
    form.appendChild(input_nrp);
    form.appendChild(input_alasan_izin_mhs);
    form.appendChild(input_file_izin_mhs);

    document.body.appendChild(form);
    form.submit();
}

matchingTbodys.forEach((tbody, index) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = '&nbsp;';
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.setAttribute('colspan', '2');
    tr.appendChild(td2);

    const td3 = document.createElement('td');
    td3.innerHTML = '&nbsp;';

    const button_hadir = document.createElement('button');
    button_hadir.type = 'button';
    button_hadir.className = 'btn btn-sm btn-its-primary mr-5 mb-5 btn-hadir-mahasiswa w-75';
    button_hadir.innerHTML = 'Hadir';
    button_hadir.setAttribute("id_tm", tm_ids[index])
    button_hadir.onclick = () => absen(hadir, tm_ids[index]);

    const button_sakit = document.createElement('button');
    button_sakit.type = 'button';
    button_sakit.className = 'btn btn-sm btn-its-primary mr-5 mb-5 btn-sakit-mahasiswa w-75';
    button_sakit.innerHTML = 'Sakit';
    button_sakit.setAttribute("id_tm", tm_ids[index])
    button_sakit.onclick = () => absen(sakit, tm_ids[index]);

    const button_izin = document.createElement('button');
    button_izin.type = 'button';
    button_izin.className = 'btn btn-sm btn-its-primary mr-5 mb-5 btn-izin-mahasiswa w-75';
    button_izin.innerHTML = 'Izin';
    button_izin.setAttribute("id_tm", tm_ids[index])
    button_izin.onclick = () => absen(izin, tm_ids[index]);

    const button_alpha = document.createElement('button');
    button_alpha.type = 'button';
    button_alpha.className = 'btn btn-sm btn-its-primary mr-5 mb-5 btn-alpha-mahasiswa w-75';
    button_alpha.innerHTML = 'Alpha';
    button_alpha.setAttribute("id_tm", tm_ids[index])
    button_alpha.onclick = () => absen(alpha, tm_ids[index]);

    td2.appendChild(button_hadir);
    td2.appendChild(button_sakit);
    td2.appendChild(button_izin);
    td2.appendChild(button_alpha);

    tr.appendChild(td3);

    tbody.appendChild(tr);
});