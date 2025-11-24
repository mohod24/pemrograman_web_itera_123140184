from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound, HTTPNotFound, HTTPBadRequest
from pyramid.response import Response
from ..models import Matakuliah

# 1. GET: Ambil Semua Data Matakuliah
@view_config(route_name='matakuliah', request_method='GET', renderer='json')
def get_matakuliah_list(request):
    # Query semua data dari database
    matakuliahs = request.dbsession.query(Matakuliah).all()
    # Ubah menjadi list dictionary agar bisa jadi JSON
    return [mk.to_dict() for mk in matakuliahs]

# 2. GET: Ambil Detail Satu Matakuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', request_method='GET', renderer='json')
def get_matakuliah_detail(request):
    mk_id = request.matchdict['id']
    # Cari data berdasarkan ID
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        return HTTPNotFound(json_body={'message': 'Matakuliah tidak ditemukan'})
    
    return mk.to_dict()

# 3. POST: Tambah Matakuliah Baru
@view_config(route_name='matakuliah', request_method='POST', renderer='json')
def add_matakuliah(request):
    # Ambil data JSON yang dikirim user
    try:
        data = request.json_body
    except:
        return HTTPBadRequest(json_body={'message': 'Invalid JSON body'})

    # Validasi sederhana (pastikan data wajib ada)
    if not all(k in data for k in ('kode_mk', 'nama_mk', 'sks', 'semester')):
        return HTTPBadRequest(json_body={'message': 'Data tidak lengkap'})

    # Buat object baru
    new_mk = Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=data['sks'],
        semester=data['semester']
    )

    # Simpan ke database
    request.dbsession.add(new_mk)
    request.dbsession.flush() # Agar ID langsung ter-generate

    return new_mk.to_dict()

# 4. PUT: Update Data Matakuliah
@view_config(route_name='matakuliah_detail', request_method='PUT', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if not mk:
        return HTTPNotFound(json_body={'message': 'Matakuliah tidak ditemukan'})

    try:
        data = request.json_body
    except:
        return HTTPBadRequest(json_body={'message': 'Invalid JSON body'})

    # Update data
    mk.kode_mk = data.get('kode_mk', mk.kode_mk)
    mk.nama_mk = data.get('nama_mk', mk.nama_mk)
    mk.sks = data.get('sks', mk.sks)
    mk.semester = data.get('semester', mk.semester)

    return mk.to_dict()

# 5. DELETE: Hapus Matakuliah
@view_config(route_name='matakuliah_detail', request_method='DELETE', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if not mk:
        return HTTPNotFound(json_body={'message': 'Matakuliah tidak ditemukan'})

    # Hapus dari database
    request.dbsession.delete(mk)
    
    return {'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus'}