function notFound(req, res) {
  res.status(404).json({ message: 'Böyle bir adres yok' });
}

function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Gönderilen JSON hatalı' });
  }

  console.log(err);
  res.status(500).json({ message: 'Sunucuda bir hata oluştu' });
}

module.exports = { notFound, errorHandler };
