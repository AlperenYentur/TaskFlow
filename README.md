# TaskFlow API

Görev ve Proje Yönetim Sistemi için Node.js + Express.js ile geliştirilmiş REST API.
*Node.js ile Backend Programlama — Bitirme Projesi*

- Proje tanıtımı: [docs/PROJE_TANITIM.md](docs/PROJE_TANITIM.md)
- Postman test ekran görüntüleri: [docs/postman/](docs/postman/)

## Gereksinimler

- [Node.js](https://nodejs.org) 18 veya üzeri (npm ile birlikte gelir)

## Kurulum ve Çalıştırma

1. Projeyi indirin:

   ```bash
   git clone https://github.com/AlperenYentur/TaskFlow.git
   cd TaskFlow
   ```

2. Bağımlılıkları kurun:

   ```bash
   npm install
   ```

3. Sunucuyu başlatın:

   ```bash
   npm start
   ```

Sunucu `http://localhost:3000` adresinde çalışır. Farklı bir port için `PORT` ortam değişkeni kullanılabilir.
Geliştirme sırasında dosya değişince otomatik yeniden başlatmak için `npm run dev` kullanılabilir.

## Endpoint Listesi

| Metot  | Adres        | Açıklama                 | Başarılı cevap |
| ------ | ------------ | ------------------------ | -------------- |
| GET    | `/tasks`     | Tüm görevleri listeler   | 200            |
| GET    | `/tasks/:id` | Görev detayını getirir   | 200            |
| POST   | `/tasks`     | Yeni görev oluşturur     | 201            |
| PUT    | `/tasks/:id` | Görevi günceller         | 200            |
| DELETE | `/tasks/:id` | Görevi siler             | 200            |

Olmayan bir görev istenirse `404`, eksik/hatalı veri gönderilirse `400` döner.

## Görev Veri Modeli

| Alan          | Tip    | Açıklama                                                   |
| ------------- | ------ | ---------------------------------------------------------- |
| `id`          | sayı   | Sistem tarafından otomatik verilir                         |
| `title`       | metin  | Görev başlığı (**zorunlu**)                                |
| `description` | metin  | Görev açıklaması                                           |
| `status`      | metin  | `pending` (varsayılan), `in-progress`, `completed`         |
| `priority`    | metin  | `low`, `medium` (varsayılan), `high`                       |
| `assignee`    | metin  | Görevin atandığı çalışan                                   |
| `createdAt`   | tarih  | Oluşturulma zamanı (otomatik)                              |
| `updatedAt`   | tarih  | Son güncellenme zamanı (otomatik)                          |

## Örnek İstek

`POST http://localhost:3000/tasks`

```json
{
  "title": "Login sayfasını tasarla",
  "description": "Kullanıcı giriş ekranının arayüzünü hazırla.",
  "priority": "high",
  "assignee": "musa"
}
```

Cevap (`201 Created`):

```json
{
  "id": 6,
  "title": "Login sayfasını tasarla",
  "description": "Kullanıcı giriş ekranının arayüzünü hazırla.",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "createdAt": "2026-11-10T20:00:00.000Z",
  "updatedAt": "2026-11-10T20:00:00.000Z"
}
```

## Klasör Yapısı

```
TaskFlow/
├── server.js                  # Sunucuyu başlatan giriş dosyası
├── package.json
├── data/
│   └── tasks.json             # Görevlerin saklandığı JSON dosyası
├── src/
│   ├── app.js                 # Express kurulumu, middleware ve route bağlantıları
│   ├── routes/
│   │   └── taskRoutes.js      # /tasks adreslerinin yönlendirmesi
│   ├── controllers/
│   │   └── taskController.js  # CRUD iş mantığı
│   ├── models/
│   │   └── taskModel.js       # JSON dosyası okuma/yazma
│   └── middleware/
│       ├── logger.js          # İstek kayıt (logger) middleware'i
│       └── errorHandler.js    # 404 ve hata cevapları
├── docs/
│   ├── PROJE_TANITIM.md       # Proje tanıtım dokümanı
│   └── postman/               # Postman koleksiyonu ve test ekran görüntüleri
└── logs/
    └── requests.log           # Logger çıktısı (çalışınca oluşur)
```

## Logger

Her istek, zaman damgası, metot ve endpoint bilgisiyle hem konsola hem de `logs/requests.log` dosyasına yazılır:

```
[2026-11-10T20:00:00.000Z] POST /tasks
[2026-11-10T20:00:05.000Z] GET /tasks/6
```

## Postman ile Test

1. Sunucuyu `npm start` ile başlatın.
2. Postman'de **Import** ile [docs/postman/TaskFlow.postman_collection.json](docs/postman/TaskFlow.postman_collection.json) dosyasını içe aktarın.
3. Koleksiyondaki istekleri sırayla çalıştırın: Görev Ekle → Görevleri Listele → Görev Detayı → Görev Güncelle → Görev Sil.
