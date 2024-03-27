'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchGoods({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    // ! nge reset page nya kalo user nge ganti input nya
    params.set('page', '1')
    term ? params.set('query', term) : params.delete('query')
    router.replace(`${pathName}?${params.toString()}`)
  }, 300)

  return (
    <div className="">

      <Input
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        // ! make default value karena nyimpennya di url bukan di state
        defaultValue={searchParams.get('query'?.toString()) ?? ''}
      />

    </div>
  );
}
